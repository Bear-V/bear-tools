use crate::error::BearToolError;
use ipnetwork::Ipv4Network;
use serde::{Deserialize, Serialize};
use std::str::FromStr;

#[derive(Debug, Serialize, Deserialize)]
pub struct CidrRes {
    min: String,
    max: String,
    size: u64,
    mask: String,
}

pub fn check_cidr(input: String) -> Result<CidrRes, BearToolError> {
    let res_network = Ipv4Network::from_str(input.as_str())?;

    let min = res_network.network().to_string();
    let max = res_network.broadcast().to_string();
    let mask = res_network.mask().to_string();
    let mut size = 4294967296;
    if res_network.prefix() != 0 {
        size = res_network.size() as u64;
    }
    Ok(CidrRes {
        min,
        max,
        size,
        mask,
    })
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
