'use client';

import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import PropertyListingCard from './property-listing-card';
import { useSearchParams } from 'next/navigation';

// GraphQL query with filter variables
const GET_PROPERTY_LISTINGS = gql`
  query GetPropertyListings(
    $first: Int
    $orderBy: [PropertyListingsOrderBy!]
    $filter: PropertyListingFilter # $minPropertyPrice: BigFloat
    # $maxPropertyPrice: BigFloat
  ) # $minTokenPrice: BigFloat
  # $maxTokenPrice: BigFloat
  # $propertyType: String
  {
    propertyListings(
      first: $first
      orderBy: $orderBy
      filter: $filter #   filter: {
      #     propertyType: { equalTo: $propertyType }
    ) #     propertyPrice: {
    #       greaterThanOrEqualTo: $minPropertyPrice
    #       lessThanOrEqualTo: $maxPropertyPrice
    #     }
    #     tokenPrice: { greaterThanOrEqualTo: $minTokenPrice, lessThanOrEqualTo: $maxTokenPrice }
    #   }
    {
      nodes {
        id
        nftItemId
        nftCollectionId
        blockNumber
        signer
        region
        location
        tokenPrice
        tokenAmount
        propertyId
        addressStreet
        addressTownCity
        area
        constructionDate
        estimatedRentalIncome
        files
        localAuthority
        map
        noOfBathrooms
        noOfBedrooms
        numberOfTokens
        offStreetParking
        outdoorSpace
        planningPermissionCode
        postCode
        pricePerToken
        propertyDescription
        propertyDevelopmentCode
        propertyName
        propertyNumber
        propertyPrice
        propertyType
        quality
        titleDeedNumber
      }
    }
  }
`;

export default function Listings() {
  const searchParams = useSearchParams();
  const propertyPrice = searchParams?.get('propertyPrice') ?? '';
  const tokenPrice = searchParams?.get('tokenPrice') ?? '';
  const propertyType = searchParams?.get('propertyType') ?? '';

  const isPropertyPrice = propertyPrice ? propertyPrice?.split('-').map(Number) : null;
  const isTokenPrice = tokenPrice ? tokenPrice?.split('-').map(Number) : null;

  const minPropertyPrice = isPropertyPrice ? isPropertyPrice[0] : 0;
  const maxPropertyPrice = isPropertyPrice ? isPropertyPrice[1] : 1000000;
  const minTokenPrice = isTokenPrice ? isTokenPrice[0] : 0;
  const maxTokenPrice = isTokenPrice ? isTokenPrice[1] : 10000;

  const buildFilterObject = () => {
    const variables: any = {
      first: 10,
      orderBy: ['BLOCK_NUMBER_DESC']
    };

    if (
      maxPropertyPrice !== null ||
      minPropertyPrice !== null ||
      maxTokenPrice !== null ||
      minTokenPrice !== null ||
      propertyType !== null
    ) {
      variables.filter = variables.filter || {};
    }

    if (minPropertyPrice !== null || maxPropertyPrice !== null) {
      variables.filter.propertyPrice = {
        greaterThanOrEqualTo: minPropertyPrice,
        lessThanOrEqualTo: maxPropertyPrice
      };
      //   variables.filter.minPropertyPrice = minPropertyPrice;
    }

    // if (maxPropertyPrice !== null) {
    //   variables.filter.PropertyPrice = maxPropertyPrice;
    // }

    if (minTokenPrice !== null || maxTokenPrice !== null) {
      variables.filter.tokenPrice = {
        greaterThanOrEqualTo: minTokenPrice,
        lessThanOrEqualTo: maxTokenPrice
      };
    }

    if (propertyType !== null && propertyType !== '') {
      variables.filter.propertyType = { equalTo: propertyType };
    }

    return variables;
  };

  // Query with filters
  const { loading, error, data } = useQuery(GET_PROPERTY_LISTINGS, {
    variables: buildFilterObject()
    // variables: {
    //   first: 10,
    //   orderBy: 'BLOCK_NUMBER_DESC',
    //   propertyType,
    //   minPropertyPrice,
    //   maxPropertyPrice,
    //   minTokenPrice,
    //   maxTokenPrice
    // }
  });

  return (
    <>
      {data && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.propertyListings.nodes.map((property: any) => (
            <PropertyListingCard key={property.id} listing={property} />
          ))}
        </div>
      )}
    </>
  );
}
