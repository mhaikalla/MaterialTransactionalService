import { body, param } from "express-validator"

export const createTransactionalValidator = [
    body('name')
        .not().isEmpty().withMessage('name harus diisi'),
    body('email')
        .not().isEmpty().isEmail().withMessage('email harus diisi'),
    body('phone')
        .not().isEmpty().isNumeric().withMessage('phone harus diisi'),
    body('password')
        .not().isEmpty().withMessage('password harus diisi')
]

export const updateTransactionalValidator = [
    body('name')
        .not().isEmpty().withMessage('name harus diisi'),
    body('email')
        .not().isEmpty().isEmail().withMessage('email harus diisi'),
    body('phone')
        .not().isEmpty().isNumeric().withMessage('phone harus diisi'),
    body('password')
        .not().isEmpty().withMessage('password harus diisi'),
    param('id')
        .not().isEmpty().withMessage('id harus diisi')
        .isNumeric().withMessage('Masukan id berupa angka')
]

export const deleteTransactionalValidator = [
    param('transactional_ids').isArray().withMessage('Masukan transactional id must be array'),
]

export const getTransactionalValidator = [
    param('id').optional({ nullable: true }).isNumeric().withMessage('Masukan Id hanya berupa numeric'),
]