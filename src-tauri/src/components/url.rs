use serde::{Deserialize, Serialize};
use url::Url;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UrlParse {
    scheme: String,
    host: String,
    port: u16,
    path: String,
    query: String,
}

pub fn parse(input: String) -> UrlParse {
    let result = Url::parse(input.as_str());

    let url = result.unwrap();
    let scheme = url.scheme();
    let host = url.host_str();
    let port = url.port();
    let path = url.path();
    let query = url.query();

    return UrlParse {
        scheme: scheme.to_string(),
        host: host.unwrap().to_string(),
        port: port.unwrap_or(0),
        path: path.to_string(),
        query: query.unwrap_or("").to_string(),
    };
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn url_parse_should_work() {
        let res = parse("https://www.baidu.com:3000/app?c=1&b=2".to_string());
        println!("{:?}", res);
    }

    #[test]
    fn example_url_parse_should_work() {
        let res = parse("https://www.baidu.com".to_string());
        println!("{:?}", res);
    }

    #[test]
    fn simple_url_parse_should_work() {
        let res = parse("www.baidu.com".to_string());
        println!("{:?}", res);
    }
}
