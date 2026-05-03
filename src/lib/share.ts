export function getSharePath(pathname: string) {
  const segments = pathname.split('/');
  const firstSegment = segments[3];

  if (firstSegment?.includes('.')) {
    return segments[4];
  }

  return firstSegment;
}
