use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
pub struct BearToolError {
    pub message: String,
    pub category: String,
}

impl From<data_encoding::DecodeError> for BearToolError {
    fn from(error: data_encoding::DecodeError) -> Self {
        BearToolError {
            category: "dataEncode".to_string(),
            message: error.to_string(),
        }
    }
}

impl From<std::io::Error> for BearToolError {
    fn from(error: std::io::Error) -> Self {
        BearToolError {
            category: "io".to_string(),
            message: error.to_string(),
        }
    }
}

impl From<ipnetwork::IpNetworkError> for BearToolError {
    fn from(error: ipnetwork::IpNetworkError) -> Self {
        BearToolError {
            category: "ipNetwork".to_string(),
            message: error.to_string(),
        }
    }
}

impl From<url::ParseError> for BearToolError {
    fn from(error: url::ParseError) -> Self {
        BearToolError {
            category: "urlParse".to_string(),
            message: error.to_string(),
        }
    }
}

impl From<chrono::ParseError> for BearToolError {
    fn from(error: chrono::ParseError) -> Self {
        BearToolError {
            category: "chronoParse".to_string(),
            message: error.to_string(),
        }
    }
}
