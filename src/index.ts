import * as dotenv from 'dotenv'
dotenv.config()
import  app  from './server'

app.listen(3008,()=>{
     console.log('hello on http://fuckYouDin:3003')
})

export default app