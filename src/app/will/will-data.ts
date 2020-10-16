import { Will } from './will';
import { InMemoryDbService } from 'angular-in-memory-web-api';


export class WillData implements InMemoryDbService {

  createDb() {
    const wills: Will[] = [
      {
        id: 41000018220,
        willNumber:"41000018220",
        birthDate: new Date(Date.now()),
        clientCode:  "MULUA  001",
        initials: "E",
        surname: "MULU",
        gender:"1",
        idNumber:"1245TEST",
        maritalStatus:"2",
        postlAddrLine1: "13 RES STREET",
        postlSuburb:"MALAN",
        noOfJointPartcpnt:"0",
        participants: ['Kagiso', 'Naledi']
    }]  ;
    return { wills };
  }
}
// export interface IClientWillDetail {
//   will_number: number | undefined;
//   status?: string | undefined;
//   client_code?: string | undefined;
//   is_epp: boolean;
//   client?: IClientDetail | undefined;
// }


// export interface IClientDetail {
//   id: string;
//   cif_code: string;
//   firstName: string;
//   surname: string;
//   initials: string;
//   user_name: string;
// }

// export class Will implements IClientWillDetail {
//   will_number: number;
//   client_code?: string;
//   is_epp: boolean;

//   clientCode: string;
//   createdDate: Date
//   editedBy: string;
//   editedDate: Date;
//   client?: IClientDetail;
// }

