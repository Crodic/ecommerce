import { TextField, TextFieldProps, styled } from '@mui/material'

const TextFiledStyled = styled(TextField)<TextFieldProps>(({ theme }) => {
    return {
        '& .MuiInputLabel-root': {
            transform: 'none',
            lineHeight: 1.2,
            position: 'relative',
            marginBottom: theme.spacing(1),
            fontSize: theme.typography.body2.fontSize
        },
        '& .MuiInputBase-root': {
            borderRadius: 8,
            backgroundColor: 'transparent !important',
            border: `1px solid rgba(${theme.palette.customColors.main}, 0.2)`,
            transition: theme.transitions.create(['border-color', 'box-shadow'], {
                duration: theme.transitions.duration.shorter
            }),
            '&:before, &:after': {
                display: 'none'
            },
            '&:placeholder': {},
            '.MuiInputBase-input': {
                padding: '8px 10px',
                color: 'red'
            },
            '&.Mui-error': {
                borderColor: theme.palette.error.main
            },
            '&.Mui-focused': {
                boxShadow: theme.shadows[2],
                '&.MuiInputBase-input:not(.MuiInputBase-readOnly):not([readonly])::placeholder': {
                    transform: 'translateX(4px)'
                }
            }
        },
        'MuiFormHelperText-root.Mui-error': {
            marginTop: '4px'
        }
    }
})

const CustomTextField = (props: TextFieldProps) => {
    const { size = 'small', InputLabelProps, variant = 'filled', ...rests } = props

    return (
        <TextFiledStyled
            size={size}
            InputLabelProps={{ ...InputLabelProps, shrink: true }}
            variant={variant}
            {...rests}
        />
    )
}

export default CustomTextField
