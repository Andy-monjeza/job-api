const {body,validationResult}=require('express-validator');

const validateReg=[
    body('name')
    .notEmpty().withMessage('please provide your name')
    .trim().escape(),
    
    body('email')
    .notEmpty().withMessage('please provide a valid email')
    .trim()
    .isEmail().withMessage('invalid email format')
    .normalizeEmail(),

    body('password')
    .notEmpty().withMessage('password required')
    .isLength({min:8, max:12}).withMessage('passwords must have more that 8 characters and less than 12 characters'),

    (req,res,next)=>{
      const errors=validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({errors:errors.array()});
      next();
    }
];

const validateLogin=[
  body('email')
  .notEmpty().withMessage('please provide email')
  .isEmail().withMessage("please provide valid email")
  .trim()
  .normalizeEmail(),

  body('password')
  .notEmpty().withMessage("password required")
  .trim(),  


  (req, res, next)=>{
     const errors=validationResult(req);
     if(!errors.isEmpty())return res.status(400).json({errors:errors.array()})
      next();
  }
]

module.exports={validateReg,validateLogin};
