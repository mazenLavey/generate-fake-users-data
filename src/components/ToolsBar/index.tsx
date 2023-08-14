import { FakeDataContext } from 'context/FakeDataContext';
import { useContext, useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { LocalizationType } from 'types/interfaces';
import Slider from '@mui/material/Slider';
import exportToCSV from 'function/exportToCSV';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import './index.css';

type Options = {
    local: LocalizationType,
    seed: number,
    errorPerRecord: number
}

const ToolsBar: React.FC = () => {
    const [isFirstRender, setIsFirstRender] = useState(true);
    const { generateFakeUsers, fakeUsers } = useContext(FakeDataContext)
    const [options, setOptions] = useState<Options>({
        local: 'en',
        seed: 0,
        errorPerRecord: 0
    })

    useEffect(()=>{
        if(!isFirstRender) {
            generateData(options.seed, options.local, options.errorPerRecord);
        }
    }, [options, isFirstRender])

    const handleChange = (e: any): void => {
        const { value, name } = e.target
        setIsFirstRender(false)
        setOptions(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleBtn = (): void => {
        const seedNum = randomNum();
        setIsFirstRender(false)
        setOptions(prev => {
            return {
                ...prev, 
                seed: seedNum
            }
        });
    }

    const randomNum = (): number => {
        const num: number = Math.ceil((Math.random() * 1000));
        return num
    }

    const generateData = (seedNum: number, localValue: LocalizationType, errorRate: number) => {
        generateFakeUsers(seedNum, localValue, errorRate);
    }

    return (
        <div className='ToolsBar'>
            <Stack spacing={2} sx={{ alignItems: "center", flexGrow: "1" }} direction={"row"}>
                <FormControl fullWidth size='small'>
                    <InputLabel id="selectRegion">Select Region</InputLabel>
                    <Select
                        labelId="selectRegion"
                        id="selectRegion"
                        name='local'
                        value={options.local}
                        label="Select Region"
                        onChange={handleChange}
                    >
                        <MenuItem value={"en"}>USA</MenuItem>
                        <MenuItem value={"ru"}>Russia</MenuItem>
                        <MenuItem value={"ar"}>Middle East</MenuItem>
                    </Select>
                </FormControl>
                <Slider
                    aria-label="error per record"
                    valueLabelDisplay="auto"
                    name='errorPerRecord'
                    onChange={handleChange}
                    value={Number(options.errorPerRecord)}
                    step={0.25}
                    min={0}
                    max={10}
                    marks
                    size='small'
                />
                <TextField
                    hiddenLabel
                    id="errorPerRecord"
                    name='errorPerRecord'
                    placeholder='Error per Record'
                    variant="filled"
                    value={options.errorPerRecord}
                    onChange={handleChange}
                    inputMode='decimal'
                    size='small'
                    inputProps={{
                        maxLength: 3
                    }}
                />
            </Stack>

            <Stack spacing={2} direction="row">
                <Button
                    variant="contained"
                    onClick={handleBtn}
                    size='small'
                    sx={{ minWidth: 110 }}
                >
                    Generate&nbsp;seed
                </Button>
                <TextField
                    id="seed"
                    name='seed'
                    placeholder='seed number'
                    variant="outlined"
                    value={options.seed}
                    onChange={handleChange}
                    inputMode='decimal'
                    size='small'
                />
                <Button
                    variant="contained"
                    onClick={() => exportToCSV(fakeUsers)}
                    size='small'
                    startIcon={<FontAwesomeIcon icon={faFileArrowDown} size='sm' />}
                    title='Export to CSV'
                >
                    CSV
                </Button>
            </Stack>
        </div>
    )
}

export default ToolsBar;