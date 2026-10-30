export function isSessionValid(session, now = Date.now()) {
  if (!session || !session.userId || !Number.isFinite(session.expiresAt)) {
    return false;
  }

  return session.expiresAt > now;
}
