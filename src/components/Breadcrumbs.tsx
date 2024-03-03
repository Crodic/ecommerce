'use client';
import React from 'react';
import { Breadcrumbs as NextBreadcrumbs, BreadcrumbItem } from '@nextui-org/react';

const Breadcrumbs = () => {
    return (
        <NextBreadcrumbs variant="bordered" size="lg">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Music</BreadcrumbItem>
            <BreadcrumbItem>Artist</BreadcrumbItem>
            <BreadcrumbItem>Album</BreadcrumbItem>
            <BreadcrumbItem>Song</BreadcrumbItem>
        </NextBreadcrumbs>
    );
};

export default Breadcrumbs;
