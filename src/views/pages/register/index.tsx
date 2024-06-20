'use client'
import { Box, Button, IconButton, InputAdornment, Link, useTheme } from '@mui/material'
import { Typography } from '@mui/material'
import NextLink from 'next/link'
import { NextPage } from 'next'
import CustomTextField from 'src/components/text-field'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'
import { useState } from 'react'
import IconifyIcon from 'src/components/Icon'
import Image from 'next/image'

import RegisterLight from '/public/images/register-light.png'
import RegisterDark from '/public/images/register-dark.png'

import CssBaseline from '@mui/material/CssBaseline'

interface IProps {}

const Register: NextPage<IProps> = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const theme = useTheme()
    const schema = yup.object().shape({
        email: yup.string().required('The Field is Required').matches(EMAIL_REG, 'The field is not email type'),
        password: yup
            .string()
            .required('The Field is Required')
            .matches(PASSWORD_REG, 'The password is contain character, special character and symbol'),
        confirmPassword: yup
            .string()
            .required('The Field is Required')
            .matches(PASSWORD_REG, 'The password is contain character, special character and symbol')
            .oneOf([yup.ref('password'), ''], 'Confirm Password is matched with Password')
    })
    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const onSubmit = (values: yup.InferType<typeof schema>) => {
        console.log('data: ', values)
    }

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                bgcolor: theme.palette.background.paper,
                display: 'flex',
                alignItems: 'center',
                padding: '40px',
                gap: '20px'
            }}
        >
            <Box
                display={{ md: 'flex', xs: 'none' }}
                sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '20px',
                    backgroundColor: theme.palette.customColors.bodyBg,
                    height: '100%',
                    minWidth: '50vw'
                }}
            >
                <Image
                    src={theme.palette.mode == 'light' ? RegisterLight : RegisterDark}
                    alt='Login Image'
                    style={{ height: 'auto', width: 'auto' }}
                    width={300}
                    height={300}
                />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: { sm: '100%', md: '300px' }
                    }}
                >
                    <Typography component='h1' variant='h3'>
                        Sign up
                    </Typography>
                    <Box
                        component='form'
                        onSubmit={handleSubmit(onSubmit)}
                        autoComplete='off'
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <Controller
                            control={control}
                            name='email'
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <CustomTextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    label='Email'
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
                                    label='Password'
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
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            name='confirmPassword'
                            render={({ field: { onChange, onBlur, value } }) => (
                                <CustomTextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    label='Confirm Password'
                                    type={showConfirmPassword ? 'text' : 'password'}
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
                                                <IconButton
                                                    sx={{
                                                        color:
                                                            theme.palette.mode === 'light'
                                                                ? theme.palette.customColors.light
                                                                : theme.palette.customColors.dark
                                                    }}
                                                    edge='end'
                                                    onClick={() => setShowConfirmPassword(prev => !prev)}
                                                >
                                                    {showConfirmPassword ? (
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
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{
                                mt: 3,
                                mb: 2,
                                color:
                                    theme.palette.mode === 'light'
                                        ? theme.palette.customColors.light
                                        : theme.palette.customColors.dark
                            }}
                        >
                            Sign up
                        </Button>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                            <Typography>Already an account?</Typography>

                            <Link component={NextLink} href='/login' variant='body2'>
                                Sign in
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Register
