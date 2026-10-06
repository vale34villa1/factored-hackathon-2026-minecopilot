import re


def sanitize_user_input(text: str, max_length: int = 500) -> str:
    if text is None:
        return ""
    value = str(text).strip()
    value = re.sub(r"[\x00-\x1f\x7f]", " ", value)
    value = re.sub(r"\s+", " ", value)
    if len(value) > max_length:
        value = value[:max_length].rstrip()
    return value


def safe_env_value(value: str | None) -> str:
    if value is None:
        return ""
    return str(value).strip()
