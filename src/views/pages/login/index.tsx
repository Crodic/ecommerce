'use client'
import { Box, Button, IconButton, InputAdornment, Link } from '@mui/material'
import { Typography } from '@mui/material'
import { Checkbox } from '@mui/material'
import { Grid } from '@mui/material'
import { FormControlLabel } from '@mui/material'
import { Container, CssBaseline } from '@mui/material'
import { NextPage } from 'next'
import CustomTextField from 'src/components/text-field'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'
import { useState } from 'react'
import IconifyIcon from 'src/components/Icon'

interface IProps {}

const LoginPage: NextPage<IProps> = () => {
    const [showPassword, setShowPassword] = useState(false)
    const schema = yup.object().shape({
        email: yup.string().required('The Field is Required').matches(EMAIL_REG, 'The field is not email type'),
        password: yup
            .string()
            .required('The Field is Required')
            .matches(PASSWORD_REG, 'The password is contain character, special character and symbol')
    })
    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const onSubmit = (values: yup.InferType<typeof schema>) => {
        console.log('data: ', values)
    }

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography component='h1' variant='h5'>
                    Sign in
                </Typography>
                <Box component='form' onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate sx={{ mt: 1 }}>
                    <Controller
                        control={control}
                        name='email'
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <CustomTextField
                                margin='normal'
                                required
                                fullWidth
                                label='Email *'
                                autoComplete='email'
                                autoFocus
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                error={Boolean(errors?.email)}
                                placeholder='Enter your email'
                                helperText={errors.email?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name='password'
                        render={({ field: { onChange, onBlur, value } }) => (
                            <CustomTextField
                                margin='normal'
                                required
                                fullWidth
                                label='Password *'
                                type={showPassword ? 'text' : 'password'}
                                autoComplete='current-password'
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                error={Boolean(errors?.password)}
                                placeholder='Enter your password'
                                helperText={errors.password?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton edge='end' onClick={() => setShowPassword(prev => !prev)}>
                                                {showPassword ? (
                                                    <IconifyIcon icon='material-symbols:visibility-outline' />
                                                ) : (
                                                    <IconifyIcon icon='ic:outline-visibility-off' />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />

                    <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
                    <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href='#' variant='body2'>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href='#' variant='body2'>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default LoginPage
