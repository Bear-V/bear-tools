use std::str::FromStr;
use ipnetwork::Ipv4Network;
use serde::{Deserialize, Serialize};
use serde_json;

#[derive(Debug, Serialize, Deserialize)]
pub struct CidrRes {
    min: String,
    max: String,
    size: u32,
    mask: String,
}

#[tauri::command]
pub fn check_cidr(input: String) -> String {
    let res_network = Ipv4Network::from_str(input.as_str());
    match res_network {
        Ok(r) => {
            let min = r.network().to_string();
            let max = r.broadcast().to_string();
            let mask = r.mask().to_string();
            let size = r.size();
            let cidr_res = CidrRes {
                min,
                max,
                size,
                mask,
            };
            serde_json::to_string(&cidr_res).unwrap()
        }
        Err(_) => "传入数据有问题，请检查".to_string(),
    }
}


#[test]
fn one() {
    let res = check_cidr("127.0.0.1/16".to_string());
    println!("{}", res)
}
