use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
pub struct BearToolError {
    message: String,
    category: String,
}

impl From<data_encoding::DecodeError> for BearToolError {
    fn from(error: data_encoding::DecodeError) -> Self {
        BearToolError {
            category: "dataEncode".to_string(),
            message: error.to_string(),
        }
    }
}
