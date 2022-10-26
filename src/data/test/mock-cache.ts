import { faker } from "@faker-js/faker";
import { GetStorage } from "../protocols/cache";


export class GetStorageSpy implements GetStorage {
  key: string 
  value: ObjectLiteral = {
    [faker.random.word()]: faker.random.word()
  }

  get(key: string) {
    this.key = key 
    return this.value
  }
  
}