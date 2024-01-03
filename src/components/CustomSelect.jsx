import { Select , SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export const CustomSelect = ({ value, onChange, options }) => {
    return (
        <Select
            value={value}
            onValueChange={onChange}
        >
            <SelectTrigger
                className='w-full'
                data-testid='select-field'
            >
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {options &&
                    Object.keys(options).map((key) => (
                        <SelectItem
                            key={key}
                            value={key}
                        >
                            {options[key]}
                        </SelectItem>
                    ))}
            </SelectContent>
        </Select>
    );
};
