import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import { AssignNonceDto } from './dto/assign-nonce.dto';
import { SignInDto } from './dto/signin.dto';
import { ethers } from 'ethers';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  generateNonce() {
    return (Math.random() * 100000).toFixed(0);
  }

  async checkSignature(nonce: string, signature: string) {
    return ethers.verifyMessage(nonce, signature);
  }

  async signIn(signInDto: SignInDto) {
    try {
      const user = await this.userModel
        .findOne({ address: signInDto.address })
        .lean();
      if (!user)
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

      if (
        !(
          (await this.checkSignature(
            String(user.nonce),
            signInDto.signature,
          )) === user.address
        )
      ) {
        throw new HttpException(
          'Error checking signature',
          HttpStatus.UNAUTHORIZED,
        );
      }

      return {
        ...user,
        isSignedIn: true,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async assignNonce(assignNonceDto: AssignNonceDto) {
    try {
      const nonce = this.generateNonce();
      const user = await this.userModel.findOne({
        address: assignNonceDto.address,
      });
      if (!user) this.userModel.create({ address: assignNonceDto.address });
      const updatedUser = await this.userModel.findOneAndUpdate(
        { address: assignNonceDto.address },
        { nonce: nonce },
        { new: true },
      );
      return updatedUser.nonce;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
