export function jwtDecode(token) {
  if (typeof token !== "string") {
    throw new Error(
      `jwtDecode expected a string, got ${typeof token}: ${JSON.stringify(
        token
      )}`
    );
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT format");
  }

  // JWT uses base64url, so convert it to normal base64 and add padding
  let base64Url = parts[1].replace(/-/g, "+").replace(/_/g, "/");
  while (base64Url.length % 4) base64Url += "=";

  const json = decodeURIComponent(
    atob(base64Url)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  const decodedToken = JSON.parse(json);

  const {
    EmployeeCode,
    DeptCode,
    UERMEmail,
    FirstName,
    FullName,
    Department_Description,
    AreaCode,
  } = decodedToken;

  return {
    EmployeeCode,
    DeptCode,
    UERMEmail,
    FirstName,
    FullName,
    Department_Description,
    AreaCode,
  };
}
