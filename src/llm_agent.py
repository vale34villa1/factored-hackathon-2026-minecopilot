import re


def sanitize_user_input(text: str, max_length: int = 500) -> str:
    if text is None:
        return ""

    clean = str(text).strip()
    clean = re.sub(r"[\x00-\x1f\x7f]", " ", clean)
    clean = re.sub(r"\s+", " ", clean)

    if len(clean) == 0:
        return ""

    if len(clean) > max_length:
        return clean[:max_length].rstrip()

    return clean


def safe_env_value(value: str | None) -> str:
    if value is None:
        return ""
    return str(value).strip()
