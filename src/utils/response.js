const STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  CONFLICT: 409,
  FORBIDDEN: 403,
  NOT_MODIFIED: 304
};


const MESSAGE = {
  REQUIRED_FIELDS: "All fields are required",
  USER_EXISTS: "User already exists",
  USER_CREATED: "User registered successfully",
  INVALID_PASSWORD: "Invalid password",
  LOGIN_SUCCESS: "Login successful",
  USER_NOTFOUND : "User does not exists",
  NO_TOKEN : "No token provided",
  INVALID_EXPIRED_TOKEN : "Invalid or expired token",
  NO_ID : "Id not found",
  USER_FETCH_SUCCESSFULLY : "User fetch successfully",
  NO_REFRESH_TOKEN : "Refresh token required",
  TOKEN_REFRESHED : "Token refreshed",
  NOT_AUTHORIZED: "Don't have access",
  ADMIN_CREATED: "Admin registered successfully",
  USER_LISTING_FETCH_SUCCESSFULLY : "User Listing fetch successfully",
  USER_DELETED_SUCCESSFULLY : "User deleted successfully",
  ADMIN_CANNOT_DELETED_THEMSELVES : "Admin cannot delete themselves",
  NAME_LOCATION_REQUIRED : "Name and location are required",
  COMPANY_ALREADY_EXISTS : "Company already exists",
  COMPANY_CREATED_SUCCESSFULLY : "Company created successfully",
  COMPANY_FETCH_SUCCESSFULLY : "Companies fetched successfully",
  COMPANY_UPDATE_SUCCESSFULLY : "Company updated successfully",
  COMPANY_NOT_FOUND : "Company not found",
  NOT_OWNER_OF_COMPANY: "Forbidden (Not owner of company)",
  VALIDATION_ERROR : "Validation error",
  COMPANY_DELETED_SUCCESSFULLY : "Company deleted successfully",
  JOB_CREATED_SUCCESSFULLY : "Job created successfully",
  JOB_ALREADY_EXISTS : "Job already exists",
  JOBS_FETCHED_SUCCESSFULLY : "Jobs fetched successfully",
  JOB_NOT_FOUND : "Job not found",
  JOB_UPDATED_SUCCESSFULLY : "Job updated successfully",
  JOB_DELETED_SUCCESSFULLY : "Job deleted successfully",
  NOT_OWNER_OF_JOB: "Forbidden (You do not own this job)",
  JOB_STATUS_UPDATED_SUCCESSFULLY: "Job status updated successfully",
  JOB_STATUS_NOT_CHANGED: "Job status not changed",
  NOTE_ADDED_SUCCESSFULLY: "Note created successfully",
  NOTE_ALREADY_EXIST_FOR_THIS_TYPE: "Note already exist for this type you can update the note for this type",
  NOTE_FETCHED_SUCCESSFULLY: "Notes fetched successfully",
};


const sendresponse= (res, status, message, data = null, error = null) =>{
    return res.status(status).json({
        success: status < 400,
        message,
        data,
        error
    });
};

module.exports = {
    STATUS,
    MESSAGE,
    sendresponse
}