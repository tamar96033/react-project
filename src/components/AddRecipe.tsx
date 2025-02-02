import { useForm } from "react-hook-form";
import RecipeStore, { recipeType } from "../stores/RecipeStore"
import { UserContext, UserContextType } from "./UserProvider";
import { useContext } from "react";
import { Box, Button, TextField } from "@mui/material";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


const style = {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const schema = object({
    title: string().required('title is required')
})

const AddRecipe = () => {


    const { user } = useContext<UserContextType | undefined>(UserContext) || { user: null, userDispatch: () => { } };

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<recipeType>({
        resolver: yupResolver(schema),
    })


    const onSubmit = (data: recipeType) => {
        data.authorId = user?.id ?? 0
        RecipeStore.addRecipe(data, user?.id ?? 0)
        reset();
    }

    const handleIngredienceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault()
        const lines = e.target.value.split('\n')
        setValue('ingredients', lines)
    }

    return (<>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={style}>
            <TextField label="title" error={!!errors.title} fullWidth {...register('title')} />
            <TextField label="description" fullWidth {...register('description')} />
            <TextField label="ingredience" placeholder="every line is a product..." fullWidth multiline onChange={handleIngredienceChange}
                sx={{
                    maxHeight: '150px',
                    overflowY: 'auto'
                }} />
            <TextField label="instruction" placeholder="for your convenience you can move lines..." fullWidth multiline {...register('instructions')}
                sx={{
                    maxHeight: '150px',
                    overflowY: 'auto'
                }} />
    
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Submit
            </Button>
        </Box>
    </>)
}

export default AddRecipe
