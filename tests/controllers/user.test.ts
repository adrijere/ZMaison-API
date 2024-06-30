import { Request, Response } from 'express';
import { postUser } from '../../src/controllers/user';
import User from '../../src/models/user';

type UserCreateMock = jest.Mock<Promise<{ userId: string; userName: string; teamId: string; userAvatarURL: string; userArrivalDate: string }>, [{ userId: string; userName: string; teamId: string; userAvatarURL: string; userArrivalDate: string }]>;


jest.mock('../../src/models/user', () => ({
  create: jest.fn() as UserCreateMock,
}));

const mockRequest = (params: any, query: any) => ({
  params,
  query,
  body: query
}) as Request;

const mockResponse = (): Response => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res) as unknown as Response['status'];
  res.json = jest.fn().mockReturnValue(res) as unknown as Response['json'];
  return res;
};

describe('postUser Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

//   test('should create a user successfully', async () => {
//     const user = { userId: '1', userName: 'John Doe', teamId: 'team1', userAvatarURL: 'http://example.com/avatar.jpg', userArrivalDate: '2023-04-01' };
//     (User.create as UserCreateMock).mockResolvedValue(user);
//     const req = mockRequest({ id: '1' }, { name: 'John Doe', teamId: 'team1', avatarURL: 'http://example.com/avatar.jpg', arrivalDate: '2023-04-01' });
//     const res = mockResponse();

//     await postUser(req, res);

//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: "Created" }));
//   });

  test('should return 400 for invalid id', async () => {
    const req = mockRequest({ id: '' }, {});
    const res = mockResponse();

    await postUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: "Bad Request" }));
  });

//   test('should return 500 for server error during user creation', async () => {
//     (User.create as UserCreateMock).mockRejectedValue(new Error('Internal Server Error'));
//     const req = mockRequest({ id: '1' }, { name: 'John Doe', teamId: 'team1', avatarURL: 'http://example.com/avatar.jpg', arrivalDate: '2023-04-01' });
//     const res = mockResponse();

//     await postUser(req, res);

//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: "Internal Server Error" }));
//   });
});
