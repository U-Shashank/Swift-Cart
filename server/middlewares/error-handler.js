const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    let customError = {
        statusCode: err.statusCode || 500,
        msg: err.message || 'Something went wrong try again later'
    }
    if(err.name === "ValidationError") {
        customError.msg = Object.values(err.errors)
        .map(item => item.message)
        .join(", ")
        customError.statusCode = 400
    }
    return res.status(customError.statusCode).json({msg: customError.msg})
}

export default errorHandlerMiddleware