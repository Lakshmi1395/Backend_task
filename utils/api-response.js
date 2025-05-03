class ApiResponse {
  static success(data = null, message = "Success") {
    return {
      success: true,
      message,
      data,
    };
  }

  static fail(message = "Failure", data = null) {
    return {
      success: false,
      message,
      data,
    };
  }
}

module.exports = ApiResponse;
