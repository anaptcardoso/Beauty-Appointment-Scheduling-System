package pt.bookly.api.service;

import org.springframework.stereotype.Service;
import pt.bookly.api.dto.blockout.BlockoutRequest;
import pt.bookly.api.dto.blockout.BlockoutResponse;
import pt.bookly.api.model.Blockout;
import pt.bookly.api.model.Provider;
import pt.bookly.api.repository.BlockoutRepository;
import pt.bookly.api.repository.ProviderRepository;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BlockoutService {

    private final BlockoutRepository blockoutRepository;
    private final ProviderRepository providerRepository;

    public BlockoutService(BlockoutRepository blockoutRepository, ProviderRepository providerRepository) {
        this.blockoutRepository = blockoutRepository;
        this.providerRepository = providerRepository;
    }

    public List<BlockoutResponse> findByProvider(UUID providerId){
        return blockoutRepository.findByProviderId(providerId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public BlockoutResponse create(UUID providerId, BlockoutRequest request){
        Provider provider = providerRepository.findById(providerId)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        Blockout blockout = new Blockout();
        blockout.setProvider(provider);
        blockout.setStartDate(request.getStartDate());
        blockout.setEndDate(request.getEndDate());
        blockout.setStartTime(request.getStartTime());
        blockout.setEndTime(request.getEndTime());
        blockout.setReason(request.getReason());
        blockout.setType(request.getType());

        Blockout saved = blockoutRepository.save(blockout);
        return mapToResponse(saved);
    }

    public void delete(UUID providerId, UUID blockoutId){
        Blockout blockout = blockoutRepository.findById(blockoutId)
                .orElseThrow(() -> new RuntimeException("Blockout not found"));
        if (!blockout.getProvider().getId().equals(providerId)){
            throw new RuntimeException("You do not have permition to delete this blockout");
        }

        blockoutRepository.delete(blockout);
    }

    private BlockoutResponse mapToResponse(Blockout blockout){
        BlockoutResponse response = new BlockoutResponse();
        response.setId(blockout.getId());
        response.setStartDate(blockout.getStartDate());
        response.setEndDate(blockout.getEndDate());
        response.setStartTime(blockout.getStartTime());
        response.setEndTime(blockout.getEndTime());
        response.setReason(blockout.getReason());
        response.setType(blockout.getType());
        return response;

    }
}
