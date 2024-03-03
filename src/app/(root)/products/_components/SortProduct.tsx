'use client';
import { Select, SelectItem } from '@nextui-org/react';
import React from 'react';

const SortProduct = () => {
    return (
        <Select
            size="sm"
            items={[
                { value: 1, label: 'A-X' },
                { value: 2, label: 'A-X' },
            ]}
            placeholder="Select an animal"
            className="w-[200px]"
        >
            {(animal) => <SelectItem key={animal.value}>{animal.label}</SelectItem>}
        </Select>
    );
};

export default SortProduct;
