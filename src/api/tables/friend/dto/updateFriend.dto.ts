import { IsString, IsNumber } from 'class-validator';

class UpdateFriendDto {
    @IsNumber()
    public friend_ship_status: number = 0;
}

export default UpdateFriendDto;
