import {Router} from 'express';
import {body,oneOf,validationResult} from 'express-validator'
import { handleInputErrors } from './modules/middleware';
import { createProduct, deleteProduct, getOneProduct, getProducts } from './handlers/product';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update';
const router = Router()



/*
Product
*/


router.get('/product',getProducts)
router.get('/product/:id', getOneProduct)
router.put('/product/:id',body('name').isString(),handleInputErrors,(req,res)=>{

})
router.delete('/product/:id', deleteProduct) 
router.post('/product',body('name').isString(),handleInputErrors, createProduct)

/*Update*/


router.get('/update',getOneUpdate)
router.get('/update/:id',getUpdates)

router.put('/update/:id',
body('title').optional(),
body('body').optional(), 
body('status').isIn([
    'IN_PROGRESS',
    'UPDATED',
    'DELETED',
    'ARCHIVED',
]).optional(),
body('version').optional(), updateUpdate)
router.delete('/update/:id',deleteUpdate)
router.post('/update',
body('title').exists().isString(),
body('body').exists().isString(),
body('productId').exists().isString(), createUpdate)


/*Update Point */

router.get('/updatepoint',()=>{
    
})
router.get('/updatepoint/:id',()=>{

})

router.put('/updatepoint/:id',
body('name').optional().isString(),
body('description ').optional().isString(), 

()=>{

})
router.delete('/updatepoint/:id',()=>{

})
router.post('/updatepoint',
body('name').isString(),
body('description ').isString(), 
body('updateId').exists().isString( ),
()=>{

})

export default router