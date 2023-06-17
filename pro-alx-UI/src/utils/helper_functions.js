// Truncate the email address while preserving the domain
export const truncateEmail = (email) => {
  const MAX_USERNAME_LENGTH = 15;

  if (email.length <= MAX_USERNAME_LENGTH) {
    return email;
  } else {
    const atIndex = email.lastIndexOf('@');
    let username = email.substring(0, atIndex);
    console.log(username);
    const domain = email.substring(atIndex);
    console.log(domain);
    if (username.length > MAX_USERNAME_LENGTH - 3) {
      username = username.substring(0, MAX_USERNAME_LENGTH - 3);
      email = `${username}...${domain}`;
    }

    return email;
  }
};

export const truncateName = (name, maxLength = 12) => {
  const parts = name.split(' ');
  const truncatedParts = parts.map((part) =>
    part.length > maxLength ? part.substring(0, maxLength - 3) + '...' : part
  );
  return truncatedParts.join(' ');
};
