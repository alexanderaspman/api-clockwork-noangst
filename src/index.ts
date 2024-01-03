import * as dotenv from 'dotenv'
dotenv.config()
import  app  from './server'

app.listen(3002,()=>{
     console.log('hello on http://fuckYouDin:3002')
})

export default app