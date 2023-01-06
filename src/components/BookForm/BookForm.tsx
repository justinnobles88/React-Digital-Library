import React from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseName, chooseEmail, choosePhone, chooseAddress } from '../../redux/slices/RootSlice';
import { Input } from '../SharedComponents/input';
import {Button} from '@material-ui/core';
import {server_calls} from '../../api/server';

interface BookFormProps {
  id?:string;
  data?:{}
}

interface BookState {
  name: string;
  email: string;
  address: string;
  phone_number: string;
}

export const BookForm = (props:BookFormProps) => {
  

    const dispatch = useDispatch(); // This is a Redux-specific hook that updates the store
    const store = useStore();
    const name = useSelector<BookState>(state => state.name);
    const { register, handleSubmit } = useForm({ })

    const onSubmit = (data:any, event:any) => {
        console.log(props.id)
        // The ! is for strictly typed Typescript stuff
        if(props.id!){
            server_calls.update(props.id!, data);
            console.log(`Updated:${data} ${props.id}`);
            console.log(data);
            setTimeout( () => {window.location.reload()}, 1000);
            event.target.reset();
        } else {
            // Dispatch basically updates our state / Redux store
            dispatch(chooseName(data.name));
            dispatch(chooseEmail(data.email));
            dispatch(choosePhone(data.phone_number));
            dispatch(chooseAddress(data.address));
            server_calls.create(store.getState());
            setTimeout( () => {window.location.reload()}, 1000)
        }
    }
  
  return (
    <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="title">Book Title</label>
                    <Input {...register('title')} name="title" placeholder='Title'/>
                </div>
                <div>
                    <label htmlFor="author">Author</label>
                    <Input {...register('author')} name="author" placeholder='Author'/>
                </div>
                <div>
                    <label htmlFor="cover">Cover</label>
                    <Input {...register('cover')} name="cover" placeholder='Cover'/>
                </div>
                <div>
                    <label htmlFor="pages">Pages</label>
                    <Input {...register('pages')} name="pages" placeholder='Pages'/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    
  )
}