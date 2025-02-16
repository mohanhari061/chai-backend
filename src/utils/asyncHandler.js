// const asyncHandler = (handler) => {};


export {asyncHandler};



const asyncHandler = (fn) => async (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
};













// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) =>  async () => {}
/*
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await(fn(req, res, next));
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
        next(error);
    }
}
*/