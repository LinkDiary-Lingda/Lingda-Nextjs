// import { Dispatch, createContext, useEffect, useReducer } from 'react';

// type User = {
//   username: string;
//   accessToken: string;
// };

// type Action =
//   | { type: 'LOGIN'; payload: User }
//   | { type: 'LOGOUT'; payload?: any };

// interface UserContextProps {
//   userState: User | undefined;
//   dispatch: Dispatch<Action>;
// }

// const UserContext = createContext<UserContextProps>({
//   userState: undefined,
//   dispatch: () => {},
// });

// const userReducer = (state: User, { type, payload }: Action) => {
//   switch (type) {
//     case 'LOGIN':
//       return payload;
//     case 'LOGOUT':
//       return undefined;
//     default:
//       throw new Error(`[ERROR] Unknown Type Error: ${type}`);
//   }
// };

// export const UserContextProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [userState, defaultDispatch] = useReducer(userReducer, undefined);
//   const dispatch: Dispatch<Action> = (action: Action) => {
//     defaultDispatch(action);
//   };
//   useEffect(() => {}, []);

//   return (
//     <UserContext.Provider value={{ userState, dispatch }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
