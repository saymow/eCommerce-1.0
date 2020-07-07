export function getStepWhenLoggedIn(path: string): number {
  switch (path) {
    case "":
      return 1;
    case "/address":
      return 2;
    default:
      return 0;
  }
}

export function getStepWhenNotLoggedIn(path: string): number {
  switch (path) {
    case "":
      return 1;
    case "/authenticate":
      return 2;
    case "/address":
      return 3;
    default:
      return 0;
  }
}
