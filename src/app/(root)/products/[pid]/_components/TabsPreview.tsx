'use client';
import React from 'react';
import { Tabs, Tab, Card, CardBody, CardHeader } from '@nextui-org/react';

export default function TabsPreview({ preview }: { preview: string }) {
    const [selected, setSelected] = React.useState('photos');

    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options" selectedKey={selected} onSelectionChange={setSelected as any}>
                <Tab key="description" title="Mô Tả">
                    <Card>
                        <CardBody>{preview}</CardBody>
                    </Card>
                </Tab>
                <Tab key="preview" title="Đánh Giá">
                    <Card>
                        <CardBody>
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                            dolore eu fugiat nulla pariatur.
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="term" title="Bảo Hành">
                    <Card>
                        <CardBody>
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                            anim id est laborum.
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
}
