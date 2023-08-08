use data_encoding::{DecodeError, BASE64, HEXLOWER};

pub fn base64_to_hex(base64_string: String) -> Result<String, DecodeError> {
    let base_vec = BASE64.decode(base64_string.as_bytes())?;
    let res = HEXLOWER.encode(base_vec.as_slice());
    Ok(res)
}

pub fn hex_to_base64(hex_string: String) -> Result<String, DecodeError> {
    let base_vec = HEXLOWER.decode(hex_string.as_bytes())?;
    let res = BASE64.encode(base_vec.as_slice());
    Ok(res)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn hex_base64_handles_should_work() {
        let hex = "2397dbee69114e2203bb424b4e84e9af2d7ee39b";
        let bh = hex_to_base64(hex.to_string());
        println!("{:?}", bh);

        let base = "I5fb7mkRTiIDu0JLToTpry1+45s=";
        let hb = base64_to_hex(base.to_string());
        println!("{:?}", hb);

        assert_eq!(hb, Ok(hex.to_string()));
        assert_eq!(bh, Ok(base.to_string()))
    }
}
