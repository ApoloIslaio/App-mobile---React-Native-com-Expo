interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}


export function signIn(): Promise<Response>{
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'faghafdughadfeghadfkgjlhadfgukahfgliugfghfaçfhafugharfugjhakdfgbabrthgelgvbebrlfgyuwg',
        user: {
          name: 'Apolo',
          email: 'apolo@gmail.com',
        }
      })
    }, 2000)
  })
}