export function smartParseDate(str: string) {
  try {
    let timestamp = Date.parse(
      str
        .replace(/[ ,]([0-9]{1,2}) ([ap]m|[ap]\.m\.|[ap]\.m)/i, "$1:00:00")
        .replace(/[ap]m|[ap]\.m\.|[ap]\.m/i, ""),
    );

    if (str.match(/pm|p\.m/i)) {
      timestamp += 12 * 60 * 60 * 1000;
    }

    return new Date(timestamp);
  } catch (e) {
    return null;
  }
}
