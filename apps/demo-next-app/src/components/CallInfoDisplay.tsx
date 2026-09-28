'use client';

import { type CampaignCallInfo, CampaignType, FieldType } from '@callixbrasil/client-sdk';
import { useCallOperatorCurrentCallInfo } from '@callixbrasil/client-sdk-react';

export function CallInfoDisplay() {
  const callInfo = useCallOperatorCurrentCallInfo();

  if (callInfo?.type === 'campaign') {
    return <CampaignCallInfoDisplay campaignCallInfo={callInfo.info} />;
  }
}

export function CampaignCallInfoDisplay(props: { campaignCallInfo: CampaignCallInfo }) {
  const { campaign, campaignList, campaignContact } = props.campaignCallInfo;

  return (
    <div className="bg-blue-50 rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">Call Information</h3>
      <div className="space-y-2 text-sm">
        {/* Display campaign details */}
        <div className="mt-2 pt-2">
          <p className="font-medium mb-1">Campaign:</p>
          <div className="pl-2 border-l-2 border-blue-200">
            <div className="flex justify-between">
              <span className="text-gray-600">ID:</span>
              <span>{campaign.id || 'Not provided'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span>{campaign.name || 'Unknown'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span>{CampaignType[campaign.type]}</span>
            </div>
          </div>
        </div>

        {/* Display campaign list details */}
        <div className="mt-2 pt-2 border-t border-blue-100">
          <p className="font-medium mb-1">Campaign List:</p>
          <div className="pl-2 border-l-2 border-blue-200">
            <div className="flex justify-between">
              <span className="text-gray-600">ID:</span>
              <span>{campaignList.id || 'Not provided'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span>{campaignList.name || 'Unknown'}</span>
            </div>
          </div>
        </div>

        {/* Display campaign contact info */}
        {campaignContact && (
          <div className="mt-2 pt-2 border-t border-blue-100">
            <p className="font-medium mb-1">Contact Info:</p>
            <div className="pl-2 border-l-2 border-blue-200">
              <div className="flex justify-between">
                <span className="text-gray-600">ID:</span>
                <span>{campaignContact.id || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span>{campaignContact.phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Label:</span>
                <span>{campaignContact.label}</span>
              </div>
            </div>
          </div>
        )}

        {/* Display campaign contact fields */}
        {campaignContact.fields.length > 0 && (
          <div className="mt-2 pt-2 border-t border-blue-100">
            <p className="font-medium mb-1">Contact Fields:</p>
            <div className="pl-2 border-l-2 border-blue-200">
              {campaignContact.fields.map((field) => (
                <div key={field.code} className="flex justify-between gap-4">
                  <span className="text-gray-600" title={`${field.code} (${FieldType[field.type]})`}>
                    {field.name}
                    {field.requiredOnCall && ' *'}:
                  </span>
                  <span className="text-right">{formatFieldValue(field.value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Display scheduled call info */}
        {campaignContact.scheduledCall && (
          <div className="mt-2 pt-2 border-t border-blue-100">
            <p className="font-medium mb-1">Scheduled Call:</p>
            <div className="pl-2 border-l-2 border-blue-200">
              <div className="flex justify-between">
                <span className="text-gray-600">Scheduled at:</span>
                <span>{campaignContact.scheduledCall.scheduledAt || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Created by:</span>
                <span>{campaignContact.scheduledCall.createdBy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Note:</span>
                <span>{campaignContact.scheduledCall.note || '-'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function formatFieldValue(value: string | null) {
  return value || '-';
}
