import mongoose from 'mongoose';
import {applications} from '../apiSchemas/applicationSchema.js';

 const getRecruiterAnalytics = async (req, res) => {
  try {

    const recruiterId = req.user.id;

    const analytics = await applications.aggregate([

      {
        $lookup: {
          from: "jobs",
          localField: "job",
          foreignField: "_id",
          as: "jobData"
        }
      },
      { $unwind: "$jobData" },

      {
        $match: {
          "jobData.postedBy": new mongoose.Types.ObjectId(recruiterId)
        }
      },

      {
        $lookup: {
          from: "jobseekers",
          localField: "applicant",
          foreignField: "_id",
          as: "applicantData"
        }
      },
      { $unwind: "$applicantData" },

      {
        $addFields: {
          matchedSkills: {
            $setIntersection: [
              {
                $map: {
                  input: "$jobData.skills",
                  as: "s",
                  in: { $toLower: "$$s" }
                }
              },
              {
                $map: {
                  input: "$applicantData.skills",
                  as: "s",
                  in: { $toLower: "$$s" }
                }
              }
            ]
          }
        }
      },

      {
        $addFields: {
          matchScore: { $size: "$matchedSkills" }
        }
      },

      {
        $facet: {

          skillDemand: [
            { $unwind: "$matchedSkills" },
            {
              $group: {
                _id: "$matchedSkills",
                count: { $sum: 1 }
              }
            },
            { $sort: { count: -1 } }
          ],

          topCandidates: [
            {
              $group: {
                _id: "$applicantData._id",
                name: { $first: "$applicantData.name" },
                totalMatchScore: { $sum: "$matchScore" }
              }
            },
            { $sort: { totalMatchScore: -1 } },
            { $limit: 5 }
          ],


          totalApplicants: [
            {
              $group: {
                _id: null,
                applicants: { $addToSet: "$applicantData._id" }
              }
            },
            {
              $project: {
                count: { $size: "$applicants" }
              }
            }
          ]

        }
      }

    ]);

    const result = analytics[0];

    res.json({
      success: true,
      skillDemand: result.skillDemand,
      topCandidates: result.topCandidates,
      totalApplicants: result.totalApplicants[0]?.count || 0
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to load recruiter analytics"
    });
  }
};

export {getRecruiterAnalytics}