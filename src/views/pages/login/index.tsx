'use client'
import { Box, Button, IconButton, InputAdornment, Link, useTheme } from '@mui/material'
import { Typography } from '@mui/material'
import { Checkbox } from '@mui/material'
import { FormControlLabel } from '@mui/material'
import { NextPage } from 'next'
import CustomTextField from 'src/components/text-field'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'
import { useState } from 'react'
import IconifyIcon from 'src/components/Icon'
import Image from 'next/image'

import LoginImageLight from '/public/images/login-light.png'
import GoogleSvg from '/public/svgs/facebook.svg'
import FacebookSvg from '/public/svgs/google.svg'

import CssBaseline from '@mui/material/CssBaseline'

interface IProps {}

const LoginPage: NextPage<IProps> = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const theme = useTheme()
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
                    src={LoginImageLight}
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
                        alignItems: 'center'
                    }}
                >
                    <Typography component='h1' variant='h3'>
                        Sign in
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
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value='remember'
                                        color='primary'
                                        checked={rememberMe}
                                        onChange={e => setRememberMe(e.target.checked)}
                                    />
                                }
                                label='Remember me'
                            />
                            <Link href='#' variant='body2'>
                                Forgot password?
                            </Link>
                        </Box>
                        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                            <Typography>Don't have an account?</Typography>

                            <Link href='#' variant='body2'>
                                Sign up
                            </Link>
                        </Box>
                        <Typography sx={{ textAlign: 'center', my: 2 }}>Or</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                            <IconButton>
                                <Image src={FacebookSvg} alt='Facebook Login' height={40} width={40} />
                            </IconButton>
                            <IconButton>
                                <Image src={GoogleSvg} alt='Google Login' height={40} width={40} />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default LoginPage
