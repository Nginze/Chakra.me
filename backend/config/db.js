const mongoose = require('mongoose')
try
{
  mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true,  useUnifiedTopology: true  })
    .then(() => {
      console.log('connected to db')
    })
}
catch(err)
{
  console.log(err)
}