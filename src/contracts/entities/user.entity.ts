import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column({ unique: true })
  private publicId: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  public password: string;

  get getPassword(): string {
    return this.password;
  }

  constructor(publicId: string, name: string, email: string, password: string) {
    this.publicId = publicId;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
