import {Router} from 'express';

const router = Router()



/*
Product
*/


router.get('/product',(req,res)=>{
    res.json({message:'req'})
})
router.get('/product/:id',(req,res )=>{
    console.log("hello")
    res.status(200 )
    res.json({message:'req'})

})
router.put('/product/:id',()=>{

})
router.delete('/product/:id',()=>{

})
router.post('/product',(req,res)=>{
    res.json({message:'jhjkhj'})

})

/*Update*/


router.get('/update',()=>{
    
})
router.get('/update/:id',()=>{

})
router.put('/update/:id',()=>{

})
router.delete('/update/:id',()=>{

})
router.post('/update',()=>{

})
export default router