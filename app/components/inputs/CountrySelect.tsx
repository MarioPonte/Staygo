'use client';

import useCountries from '@/app/hooks/useCountries';
import Select from 'react-select';

export type CountrySelectValue = {
    flag: string;
    label: string;
    latlng: number[];
    region: string;
    value: string;
}

interface CountrySelectProps {
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
    value,
    onChange
}) => {
    const { getAll } = useCountries();

    return (
        <div>
            <Select
                placeholder="Anywhere"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as CountrySelectValue)}
                formatOptionLabel={(option: any) => (
                    <div className='flex flex-row items-center gap-3'>
                        <div className='dark:text-zinc-300'>{option.flag}</div>
                        <div className='dark:text-white'>
                            {option.label},
                            <span className='text-neutral-500 dark:text-zinc-200 ml-1'>
                                {option.region}
                            </span>
                        </div>
                    </div>
                )}
                classNames={{
                    control: () => 'p-3 border-2 dark:bg-zinc-900',
                    input: () => 'text-lg',
                    option: () => 'text-lg dark:bg-zinc-900 dark:hover:bg-teal-950'
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#f0fdf4'
                    }
                })}
            />
        </div>
    )
}

export default CountrySelect;