import mongoose, { Document } from 'mongoose';
import {ProductInterface} from '../product.interface'
import {ProductSchema} from "./product.schema";

const PostModel = mongoose.model<ProductInterface & Document>('Product', ProductSchema);

export default PostModel;