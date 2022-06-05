const CustomResponse = {
    success: (status, data, message) => {
        return { status, data, message }
    },
    error: (status, message) => {

    },
}
module.exports = CustomResponse;

