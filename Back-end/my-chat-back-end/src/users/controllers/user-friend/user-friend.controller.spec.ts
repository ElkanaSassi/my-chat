import { Test, TestingModule } from '@nestjs/testing';
import { UserFriendController } from './user-friend.controller';

describe('UserFriendController', () => {
  let controller: UserFriendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFriendController],
    }).compile();

    controller = module.get<UserFriendController>(UserFriendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
