use std::str::FromStr;
use ipnetwork::Ipv4Network;
use serde::{Deserialize, Serialize};
// use serde_json;

#[derive(Debug, Serialize, Deserialize)]
pub struct CidrRes {
    min: String,
    max: String,
    size: u64,
    mask: String,
}

#[tauri::command]
pub fn check_cidr(input: String) -> CidrRes {
    let res_network = Ipv4Network::from_str(input.as_str()).unwrap();

    let min = res_network.network().to_string();
    let max = res_network.broadcast().to_string();
    let mask = res_network.mask().to_string();
    let mut size = 4294967296;
    if res_network.prefix() != 0 {
        size = res_network.size() as u64;
    }
    CidrRes {
        min,
        max,
        size,
        mask,
    }
}


#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn check_cidr_should_work() {
        let res = check_cidr("127.0.0.1".to_string());
        println!("{:?}", res);
    }
}