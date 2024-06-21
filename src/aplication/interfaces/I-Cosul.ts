export default interface IConsul {
  RegisterService: (
    data: any,
    forceRegister: boolean,
  ) => Promise<void>;
}
